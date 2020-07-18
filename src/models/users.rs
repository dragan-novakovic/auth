#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: Option<bson::oid::ObjectId>,
    pub username: Option<String>,
    pub password: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InsertableUser {
    pub username: Option<String>,
    pub password: Option<String>,
}

impl InsertableUser {
    pub fn from_user(user: User) -> InsertableUser {
        InsertableUser {
            username: user.username,
            password: user.password,
        }
    }
}
