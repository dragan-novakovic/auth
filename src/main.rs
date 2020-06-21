// use futures::TryStreamExt as _;
use hyper::service::{make_service_fn, service_fn};
use hyper::{http, Body, Method, Request, Response, Server};
use std::convert::Infallible;
use std::net::SocketAddr;

fn register(req: Request<Body>) -> Result<Response<Body>, http::Error> {
    println!("{:?}", req.body());

    Response::builder()
        .header("Access-Control-Allow-Origin", "*")
        .body(Body::from("Hello"))
}

async fn router(req: Request<Body>) -> Result<Response<Body>, http::Error> {
    match (req.method(), req.uri().path()) {
        (&Method::GET, "/") => Ok(Response::new(Body::from("Try POSTing data to /echo"))),
        (&Method::POST, "/register") => register(req),
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
