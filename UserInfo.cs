namespace my_new_app
{
    public class UserInfo
    {
        private int m_nID = -1;
        private string m_strUserID = "";
        private string m_strName = "";
        private string m_strEmail = "";
        private string m_strPhoneNumber= "";
        private string m_strPassWord = "";
        private int m_nUserLevel = -1;

        public int ID
        {
            get { return m_nID; }
            set { m_nID = value; }
        }

        public string UserID
        {
            get { return m_strUserID; }
            set { m_strUserID = value; }
        }

        public string Name
        {
            get { return m_strName; }
            set { m_strName = value; }
        }

        public string Email
        {
            get { return m_strEmail; }
            set { m_strEmail = value; }
        }

        public string PhoneNumber
        {
            get { return m_strPhoneNumber; }
            set { m_strPhoneNumber = value; }
        }

        public string PassWord
        {
            get { return m_strPassWord; }
            set { m_strPassWord = value; }
        }

        public int UserLevel
        {
            get { return m_nUserLevel; }
            set { m_nUserLevel = value; }
        }

    }
}
