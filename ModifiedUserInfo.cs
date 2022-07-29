namespace my_new_app
{
    public class ModifiedUserInfo
    {
        string m_strUserName;
        string m_strUserEmail;
        string m_strUserPassWord;
        int m_nID;

        public string UserName
        {
            get { return m_strUserName; }

            set { m_strUserName = value; }
        }

        public string UserPassWord
        {
            get { return m_strUserPassWord; }

            set { m_strUserPassWord = value; }
        }

        public string UserEmail
        {
            get { return m_strUserEmail; }

            set { m_strUserEmail = value; }
        }

        public int ID
        {
            get { return m_nID; }

            set { m_nID = value; }
        }

    }
}
