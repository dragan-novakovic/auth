#[macro_use]
extern crate serde_derive;
use hyper::service::{make_service_fn, service_fn};
use hyper::Server;
use mongodb::{options::ClientOptions, Client};
use std::convert::Infallible;
use std::net::SocketAddr;
extern crate serde;
extern crate serde_json;

mod models;
mod routes;

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let mut client_options = ClientOptions::parse("mongodb://localhost:27017")
        .await
        .unwrap();

    client_options.app_name = Some("AUTH-SERVICE".to_string());

    // Get a handle to the deployment.
    let client = Client::with_options(client_options).unwrap();

    // Get a handle to a database.
    let db = client.database("AUTH-SERVICE");

    let make_svc = make_service_fn(|_conn| {
        let db = db.clone();
        async {
            Ok::<_, Infallible>(service_fn(move |req| {
                routes::router::router(req, db.to_owned())
            }))
        }
    });

    let server = Server::bind(&addr).serve(make_svc);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}
