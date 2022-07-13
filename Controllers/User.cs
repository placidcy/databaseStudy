namespace my_new_app.Controllers
{
    public class User
    {
        private string userID = "";
        private string password = "";

        public string ID
        {
            get
            {
                return userID;
            }

            set
            {
                userID = value;
            }
        }

        public string Password
        {
            get
            {
                return password;
            }

            set
            {
                password = value;
            }
        }
    }
}
