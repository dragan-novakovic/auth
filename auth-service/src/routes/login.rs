use crate::models::{
    shared::Claims,
    users::{InsertableUser, User},
};
use bson::Bson;
use bytes::Buf;
use hyper::{header, http, Body, Request, Response, StatusCode};
use jsonwebtoken::{encode, Algorithm, EncodingKey, Header};
use mongodb::{
    bson::{doc, from_bson},
    Database,
};

static AUTH_SECRET: &'static [u8] = b"some_secret_key";

pub async fn login(req: Request<Body>, db: Database) -> Result<Response<Body>, http::Error> {
    let whole_body = hyper::body::aggregate(req).await.unwrap();

    let data: InsertableUser = serde_json::from_slice(whole_body.bytes()).unwrap();
    let users_collection = db.collection("users");

    // 1. look for profile
    let user_cursor: Bson = users_collection
        .find_one(Some(doc! {"username": data.username.unwrap()}), None)
        .await
        .unwrap()
        .unwrap()
        .into();

    let user: User = from_bson(user_cursor).unwrap();

    // 2. check if passwords match
    if user.password == data.password {
        //3. give back jwt after register
        let my_claims = Claims {
            sub: "b@b.com".to_owned(),
            company: "ACME".to_owned(),
            exp: 10000000000,
        };

        let mut header = Header::default();
        header.kid = Some("signing_key".to_owned());
        header.alg = Algorithm::HS512;

        let token = match encode(&header, &my_claims, &EncodingKey::from_secret(AUTH_SECRET)) {
            Ok(t) => t,
            Err(_) => panic!(), // in practice you would return the error
        };

        let payload = user.remove_password().generate_token(token);

        let response = Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, "application/json")
            .body(Body::from(serde_json::to_string(&payload).unwrap()))?;
        return Ok(response);
    }

    let response = Response::builder()
        .status(StatusCode::UNAUTHORIZED)
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from("Wrong username or password"))?;
    Ok(response)
}
