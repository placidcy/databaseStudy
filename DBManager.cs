using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;

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

            //sqlConnect = new SqlConnection();
            //string constring = "server=" + m_strServerIP + "," + m_strPort + ";database=" + m_strDBName + ";uid=" + m_strID + ";pwd=" + m_strPassword;
            //string constring = "Data Source=" + m_strServerIP + "," + m_strPort + ";Initial Catalog=" + m_strDBName + ";User ID=" + m_strID + ";Password=" + m_strPassword + ";";
            string constring = string.Format("Data Source={0};Initial Catalog={1};User ID={2};Password={3};", Host, m_strDBName, m_strID, m_strPassword);

            string sqlQuery = "SELECT * FROM UserInfo";

            m_sqlConnect = new SqlConnection(constring)

            SqlCommand sqlCommand = new SqlCommand(sqlQuery, m_sqlConnect);
            SqlDataReader dataReader = sqlCommand.ExecuteReader();

            m_sqlConnect.Open();
            sqlCommand.Connection = m_sqlConnect;
            sqlCommand.CommandText = "SELECT * FROM UserInfo";
            sqlCommand.ExecuteNonQuery();





            
            //sqlConnect = new SqlConnection();
            //sqlConnect.ConnectionString = constring;

            //sqlConnect.Open();

            //string strSQL = "select * from UserInfo";
            //SqlCommand cmd = new SqlCommand(strSQL, sqlConnect);
            //string[] data = SelectQuery(cmd);

            if (m_sqlConnect != null)
            {
                m_sqlConnect.Close();
            }

            return true;
        }

        public ArrayList RequestSQL(string strSQL)
        {
            ArrayList arrResult = new ArrayList();
            SqlCommand cmdSelect = new SqlCommand(strSQL, m_sqlConnect);

            SqlDataReader dataReader = cmdSelect.ExecuteReader();

            arrResult.Add(dataReader);

            return arrResult;
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
