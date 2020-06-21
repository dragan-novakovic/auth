use hyper::service::{make_service_fn, service_fn};
use hyper::{http, Body, Method, Request, Response, Server, StatusCode};
use std::convert::Infallible;
use std::net::SocketAddr;

async fn register(req: Request<Body>) -> Result<Response<Body>, http::Error> {
    // Aggregate the body...
    let whole_body = hyper::body::aggregate(req).await?;
    // Decode as JSON...
    let mut data: serde_json::Value = serde_json::from_reader(whole_body.reader())?;
    // Change the JSON...
    data["test"] = serde_json::Value::from("test_value");
    // And respond with the new JSON.
    let json = serde_json::to_string(&data)?;
    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(json))?;
    Ok(response)
}

async fn router(req: Request<Body>) -> Result<Response<Body>, http::Error> {
    match (req.method(), req.uri().path()) {
        (&Method::GET, "/") => Ok(Response::new(Body::from("Try POSTing data to /echo"))),
        (&Method::POST, "/register") => register(req).await,
        _ => Ok(Response::new(Body::empty())),
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
