using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using sevrer;

namespace server {
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("Username")]
        public string Username { get; set; }


        public string Password { get; set; }

        public Dictionary<string, TestResult> TestResults { get; set; }

        public User()
        {
            TestResults = new Dictionary<string, TestResult>();
        }
    }
}


public class TestResult
{
    public bool IsCompleted { get; set; }
    public int Score { get; set; }
}