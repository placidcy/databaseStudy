using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace my_new_app
{
    public class DBManager
    {
        private string m_strServerIP = "192.168.0.104";
        //private string m_strPort = "1433";
        private string m_strDBName = "MyDataBase";
        private string m_strID = "sa";
        private string m_strPassword = "9449966Ab";

        private SqlConnection m_sqlConnect;

        public DBManager()
        {
            Connect();
        }

        public bool Connect()
        {
            string Host = m_strServerIP;

            string constring = string.Format("Data Source={0};Initial Catalog={1};User ID={2};Password={3};", Host, m_strDBName, m_strID, m_strPassword);

            m_sqlConnect = new SqlConnection(constring);

            m_sqlConnect.Open();

            if (m_sqlConnect != null)
            {
                m_sqlConnect.Close();
            }

            return true;
        }

        public ArrayList RequestSQL(string strSQL)
        {
            ArrayList arrResult = new ArrayList();
            StringBuilder strBuilder = new StringBuilder();

            string sqlQuery = strSQL;

            m_sqlConnect.Open();

            SqlCommand sqlCommand = new SqlCommand(sqlQuery, m_sqlConnect);

            sqlCommand.Connection = m_sqlConnect;
            sqlCommand.CommandText = sqlQuery;

            SqlDataReader dataReader = sqlCommand.ExecuteReader(System.Data.CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                string strID = dataReader["userID"] as string;
                string strLevel = dataReader["ID"] as string;

                strBuilder.Append(strID);
                strBuilder.Append(strLevel);
            }

            arrResult.Add(strBuilder);

            dataReader.Close();

            return arrResult;
        }

        public List<UserLevel> SelectUserLevel(string strCondition)
        {
            List<UserLevel> userLevelList = null;

            string strSQL = "SELECT ID, levelName FROM UserLevel";

            if(strCondition != null && strCondition.Length > 0) 
            {
                strSQL += " WHERE "  + strCondition + "'";
            }

            m_sqlConnect.Open();

            SqlCommand sqlCmd = new SqlCommand(strSQL, m_sqlConnect);
            SqlDataReader dataReader = sqlCmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);

            while(dataReader.Read())
            {
                string strID = dataReader["ID"] as string;
                string strLevelName = dataReader["levelName"] as string;

                int nID = -1;

                if(Int32.TryParse(strID, out nID) == false)
                {
                    return null;
                }

                UserLevel userLevel = new UserLevel();

                userLevel.ID = nID;
                userLevel.LevelName = strLevelName;

                userLevelList.Add(userLevel);
            }

            dataReader.Close();

            return userLevelList;
        }

        public List<UserInfo> SelectUserInfos(string strCondision)
        {
            List<UserInfo> userInfos = new List<UserInfo>();

            string strSQL = "Select ID, userID, name, email, phoneNumber, userLevel, password From UserInfo";

            if (strCondision != null && strCondision.Length > 0)
            {
                strSQL += " Where " + strCondision;
            }

            m_sqlConnect.Open();
             
            SqlCommand sqlCommand = new SqlCommand(strSQL, m_sqlConnect);
            SqlDataReader dataReader = sqlCommand.ExecuteReader(System.Data.CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                string strID = dataReader["ID"].ToString() as string;
                string strUserID = dataReader["userID"] as string;
                string strName = dataReader["name"] as string;
                string strEmail = dataReader["email"] as string;
                string strPhoneNumber = dataReader["phoneNumber"] as string;
                string strUserLevel = dataReader["userLevel"].ToString() as string;
                string strPassWord = dataReader["password"] as string;
               
                int nID = -1;
                int nUserID = -1;

                if(Int32.TryParse(strID, out nID) == false)
                {
                    return null;
                }

                if(Int32.TryParse(strUserLevel, out nUserID) == false)
                {
                    return null;
                }

                UserInfo userInfo = new UserInfo();
                userInfo.ID = nID;
                userInfo.UserID = strUserID;
                userInfo.Name = strName;
                userInfo.Email = strEmail;
                userInfo.PhoneNumber = strPhoneNumber;
                userInfo.UserLevel = nUserID;
                userInfo.PassWord = strPassWord;

                userInfos.Add(userInfo);
            }

            dataReader.Close();

            return userInfos;
        }

        public List<UserInfo> ModifyUserDB(string strName, string strEmail, string strCondition)
        {
            List<UserInfo> userList = new List<UserInfo>();

            if(strCondition == null || strCondition.Length <= 0)
            {
                return null;
            }

            string sql = "UPDATE UserInfo SET ";

            if (strName != null && strName.Length > 0) {
                sql += " name = '" + strName + "'";
            }

            if (strEmail != null && strEmail.Length > 0)
            {
                sql += ", email = '" + strEmail + "'";
            }

            if (strCondition != null || strCondition.Length > 0)
            {
                sql += " WHERE ID = '" + strCondition + "'";
            }

            m_sqlConnect.Open();

            SqlCommand sqlCommand = new SqlCommand(sql, m_sqlConnect);
            SqlDataReader dataReader = sqlCommand.ExecuteReader();

            while (dataReader.Read())
            {
                string strUserName = dataReader["name"] as string;
                string strUserEmail = dataReader["email"] as string;
                //string strUserPassword = dataReader["password"] as string;

                UserInfo userInfo = new UserInfo();
                userInfo.Name = strUserName;
                userInfo.Email = strUserEmail;

                userList.Add(userInfo);
            }

            dataReader.Close();


            return userList;
        }

        public List<UserInfo> ModifyPassWord_DB(string strPassWord, string strCondition)
        {
            List<UserInfo> userList = new List<UserInfo>();

            if(strCondition == null || strCondition.Length <= 0)
            {
                return null;
            }

            string sql = "UPDATE UserInfo SET";

            if(strPassWord != null && strPassWord.Length > 0)
            {
                sql += " password = '" + strPassWord + "'";
            }

            if(strCondition != null && strCondition.Length > 0)
            {
                sql += " WHERE ID = '" + strCondition + "'";
            }

            m_sqlConnect.Open();

            SqlCommand sqlCommend = new SqlCommand(sql, m_sqlConnect);
            SqlDataReader sqlReader = sqlCommend.ExecuteReader();

            while(sqlReader.Read())
            {
                UserInfo info = new UserInfo();

                string password = sqlReader["password"] as string;
                info.PassWord = password;
                userList.Add(info);
            }

            sqlReader.Close();

            return userList;
        }

        private static string[] SelectQuery(SqlCommand cmd)
        {
            SqlDataReader reader = cmd.ExecuteReader();
            List<string> datas = new List<string>();
            int nColumnCount = reader.FieldCount;
            while (reader.Read())
            {
                for (int i = 0; i < nColumnCount; i++)
                {
                    if (reader.IsDBNull(i))
                        AddNullData(datas);
                    else
                    {
                        AddData(datas, reader.GetValue(i));
                    }
                }
            }
            reader.Close();
            return MakeSuccess(datas);
        }

        protected static void AddData(List<string> datas, object data)
        {
            // 데이터 로드 시 배열일 경우 처리
            // 바로 ToString을 하여 데이터 추가 시 예를 들어 System.Byte[] 식으로 추가가 되기 때문에 따로 처리
            if (data.GetType().IsArray)
            {
                Type dataType = data.GetType();
                data = Convert.ChangeType(data, dataType);
                int length = ((Array)data).Length;
                string tempStr = "";
                if (length > 0)
                {
                    object[] dataTemp = new object[length];
                    Array.Copy((Array)data, dataTemp, length);
                    tempStr = string.Join(",", dataTemp);
                }
                datas.Add("!" + tempStr);
            }
            else
            {
                datas.Add("!" + data.ToString());
            }
        }

        protected static void AddNullData(List<string> datas)
        {
            datas.Add("~");
        }

        protected static string[] MakeSuccess(List<string> datas)
        {
            string[] results = null;
            if (datas == null)
            {
                results = new string[2];
                results[0] = "1";
                results[1] = "0";
            }
            else
            {
                int nDataCount = datas.Count + 2;
                results = new string[nDataCount];
                results[0] = "1";
                results[1] = datas.Count.ToString();
                for (int i = 2; i < nDataCount; i++)
                {
                    results[i] = datas[i - 2];
                }
            }
            return results;
        }
    }
}
