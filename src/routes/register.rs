use bytes::Buf;
use hyper::{header, http, Body, Request, Response, StatusCode};
use mongodb::Database;

pub async fn register(req: Request<Body>, db: Database) -> Result<Response<Body>, http::Error> {
    let whole_body = hyper::body::aggregate(req).await.unwrap();

    let data: serde_json::Value = serde_json::from_slice(whole_body.bytes()).unwrap();
    let users_collection = db.collection("users");

    let new_user_id = match bson::to_bson(&data) {
        Ok(result) => match result {
            bson::Bson::Document(user_doc) => {
                match users_collection.insert_one(user_doc, None).await {
                    Ok(result) => println!("{:?}", result),
                    Err(err) => println!("{:?}", err),
                }
            }
            _ => println!("Wierd err"),
        },
        Err(err) => println!("{:?}", err),
    };

    // 3. give back jwt after register

    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(serde_json::to_string(&data).unwrap()))?;
    Ok(response)
}

// use hmac::{Hmac, NewMac};
// use jwt::{RegisteredClaims, SignWithKey, VerifyWithKey};
// use sha2::Sha256;

// fn new_token(user_id: &str, password: &str) -> Result<String, &'static str> {
//     // Dummy auth
//     if password != "password" {
//         return Err("Wrong password");
//     }

//     let claims = RegisteredClaims {
//         issuer: Some("mikkyang.com".into()),
//         subject: Some(user_id.into()),
//         ..Default::default()
//     };

//     let key: Hmac<Sha256> = Hmac::new_varkey(b"secret_key").map_err(|_e| "Invalid key")?;

//     let signed_token = claims.sign_with_key(&key).map_err(|_e| "Sign failed")?;

//     Ok(signed_token)
// }

// fn login(token: &str) -> Result<String, &'static str> {
//     let key: Hmac<Sha256> = Hmac::new_varkey(b"secret_key").map_err(|_e| "Invalid key")?;
//     let claims: RegisteredClaims =
//         VerifyWithKey::verify_with_key(token, &key).map_err(|_e| "Parse failed")?;

//     claims.subject.ok_or("Missing subject")
// }

// fn main() -> Result<(), &'static str> {
//     let token = new_token("Michael Yang", "password")?;

//     let logged_in_user = login(&*token)?;

//     assert_eq!(logged_in_user, "Michael Yang");
//     Ok(())
// }
