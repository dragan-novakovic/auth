use hyper::{http, Body, Method, Request, Response};
use mongodb::Database;

use crate::routes::{login::login, register::register};

pub async fn router(req: Request<Body>, db: Database) -> Result<Response<Body>, http::Error> {
    match (req.method(), req.uri().path()) {
        (&Method::POST, "/register") => register(req, db).await,
        (&Method::POST, "/login") => login(req, db).await,
        _ => Ok(Response::new(Body::from("Wrong Route go to /register"))),
    }
}
