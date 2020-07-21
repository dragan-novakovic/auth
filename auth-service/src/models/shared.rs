#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub company: String,
    pub exp: usize,
}

//  let token_data = match decode::<Claims>(
//             &token,
//             &DecodingKey::from_secret(AUTH_SECRET),
//             &Validation::new(Algorithm::HS512),
//         ) {
//             Ok(c) => c,
//             Err(err) => match *err.kind() {
//                 ErrorKind::InvalidToken => panic!(), // Example on how to handle a specific error
//                 _ => panic!(),
//             },
//         };
