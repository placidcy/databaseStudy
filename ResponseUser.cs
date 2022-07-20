namespace my_new_app
{
    public class ResponseUser : Response
    {
        UserInfo m_userInfo;

        public UserInfo UserInfo
        {
            get { return m_userInfo; }
            set { m_userInfo = value; }
        }
    }
}
