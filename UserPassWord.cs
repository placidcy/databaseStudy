namespace my_new_app
{
    public class UserPassWord
    {
        string m_strPassword;
        int m_nID;

        public string Password
        {
            get { return m_strPassword; }
            set { m_strPassword = value; }
        }

        public int ID
        {
            get { return m_nID; }
            set { m_nID = value; }
        }
    }
}
