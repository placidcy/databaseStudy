using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;


namespace my_new_app.Controllers
{
    public class UserInfoController : Controller
    {
        DBManager m_dbManager;
        UserPassWord userPassword;

        public UserInfoController()
        {
            m_dbManager = new DBManager();
            userPassword = new UserPassWord();
        }

        [HttpPost]
        public ActionResult requestUserData([FromBody] User userInfo)
        {
            List<UserInfo> memberList = new List<UserInfo>();
            ResponseUser user = new ResponseUser();

            // 해당하는 아이디가 있는지 검사
            memberList = m_dbManager.SelectUserInfos("userID= '" + userInfo.ID + "'");

            // memberList값이 없을때(SQL 쿼리문이 잘못됐을때)
            if(memberList == null)
            {
                user.Success = false;
                user.Message = "memberList 값이 존재하지 않음";
            }

            // 유저 정보가 없을때(memberLIst.count == 0)
            if (memberList.Count == 0)
            {
                user.Success = false;
                user.Message = "유저 정보가 없음";
            }

            // 유저 정보가 있을때 아이디, 비밀번호가 맞는지 검사
            for(int i = 0; i < memberList.Count; i++)
            { 
                if (userInfo.Password == memberList[i].PassWord)
                {
                    user.Message = "비밀번호가 일치함";
                    user.Success = true;

                    user.UserInfo = new UserInfo();
                    user.UserInfo.UserID = memberList[0].UserID;
                    user.UserInfo.ID = memberList[0].ID;
                    user.UserInfo.Name = memberList[0].Name;
                    user.UserInfo.Email = memberList[0].Email;
                    user.UserInfo.PhoneNumber = memberList[0].PhoneNumber;
                    user.UserInfo.UserLevel = memberList[0].UserLevel;
                }

                else
                {
                    user.Message = "비밀번호가 일치하지 않음";
                    user.Success = false;
                }
            }

            return Ok(user);
        }
    }
}
