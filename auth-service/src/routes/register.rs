use crate::models::users::User;
use bson::Bson;
use bytes::Buf;
use hyper::{header, http, Body, Request, Response, StatusCode};
use mongodb::{
    bson::{doc, from_bson},
    Database,
};

pub async fn register(req: Request<Body>, db: Database) -> Result<Response<Body>, http::Error> {
    let whole_body = hyper::body::aggregate(req).await.unwrap();

    let data: serde_json::Value = serde_json::from_slice(whole_body.bytes()).unwrap();
    let users_collection = db.collection("users");

    let new_user_id = match bson::to_bson(&data) {
        Ok(result) => match result {
            Bson::Document(user_doc) => match users_collection.insert_one(user_doc, None).await {
                Ok(result) => Some(result.inserted_id.as_object_id().unwrap().clone()),
                Err(err) => {
                    println!("{:?}", err);
                    None
                }
            },
            _ => None,
        },
        Err(err) => {
            println!("{:?}", err);
            None
        }
    };

    let new_user_cursor: Bson = users_collection
        .find_one(Some(doc! {"_id": new_user_id.unwrap()}), None)
        .await
        .unwrap()
        .unwrap()
        .into();

    let new_user: User = from_bson(new_user_cursor).unwrap();

    let response = Response::builder()
        .status(StatusCode::CREATED)
        .header(header::CONTENT_TYPE, "application/json")
        .header(header::LOCATION, "/login")
        .body(Body::from(serde_json::to_string(&new_user).unwrap()))?;
    Ok(response)
}
