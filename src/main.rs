use bytes::Buf;
use hyper::service::{make_service_fn, service_fn};
use hyper::{header, http, Body, Method, Request, Response, Server, StatusCode};
use std::convert::Infallible;
use std::net::SocketAddr;

async fn register(req: Request<Body>) -> Result<Response<Body>, http::Error> {
    let whole_body = hyper::body::aggregate(req).await.unwrap();

    let mut data: serde_json::Value = serde_json::from_slice(whole_body.bytes()).unwrap();

    // 1. get username, password
    // 2. store in mongodb
    // 3. give back jwt after register

    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(serde_json::to_string(&data).unwrap()))?;
    Ok(response)
}

async fn router(req: Request<Body>) -> Result<Response<Body>, http::Error> {
    match (req.method(), req.uri().path()) {
        (&Method::POST, "/register") => register(req).await,
        _ => Ok(Response::new(Body::from("Wrong Route go to /register"))),
    }
}

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    let make_svc = make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(router)) });

    let server = Server::bind(&addr).serve(make_svc);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}
