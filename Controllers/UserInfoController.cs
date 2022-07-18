using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;


namespace my_new_app.Controllers
{
    public class UserInfoController : Controller
    {
        DBManager m_dbManager;

        public UserInfoController()
        {
            m_dbManager = new DBManager();
        }

        [HttpPost]
        public ActionResult requestUserData([FromBody] User userInfo)
        {
            List<UserInfo> memberList = new List<UserInfo>();

            memberList = m_dbManager.SelectUserInfos("userID= '" + userInfo.ID + "'" + " AND " + "password = '" + userInfo.Password + "'");

            for(int i = 0; i < memberList.Count; i++)
            {
                if(userInfo.ID == memberList[i].UserID && userInfo.Password == memberList[i].PassWord)
                {
                    return Ok();
                }
            }

            return BadRequest();
        }
    }
}
