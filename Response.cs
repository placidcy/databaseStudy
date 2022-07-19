using System.Collections.Generic;

namespace my_new_app
{
    public class Response
    {
        bool m_bSucess = false;
        string m_strMessage;

        public bool Success
        {
            get { return m_bSucess; }

            set { m_bSucess = value; }
        }

        public string Message
        {
            get { return m_strMessage; }

            set { m_strMessage = value; }
        }
    }
}
