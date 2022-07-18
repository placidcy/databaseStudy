using System.Collections;
using System.Collections.Generic;

namespace my_new_app
{
    public class UserLevel
    {
        private int m_nID = 0;
        private string m_strLevelName = "";

        public int ID
        {
            get { return m_nID; }
            set { m_nID = value; }
        }

        public string LevelName
        {
            get { return m_strLevelName; }
            set { m_strLevelName = value; }
        }
    }
}
