using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;


namespace my_new_app.Controllers
{
    public class UserInfoController : Controller
    {
        DBManager m_dbManager;
        Response response;

        public UserInfoController()
        {
            m_dbManager = new DBManager();
            response = new Response();
        }

        [HttpPost]
        public ActionResult requestUserData([FromBody] User userInfo)
        {
            List<UserInfo> memberList = new List<UserInfo>();

            // 해당하는 아이디가 있는지 검사
            memberList = m_dbManager.SelectUserInfos("userID= '" + userInfo.ID + "'");

            // memberList값이 없을때(SQL 쿼리문이 잘못됐을때)
            if(memberList == null)
            {
                response.Success = false;
                response.Message = "memberList 값이 존재하지 않음";
            }

            // 유저 정보가 없을때(memberLIst.count == 0)
            if(memberList.Count == 0)
            {
                response.Success = false;
                response.Message = "유저 정보가 없음";
            }

            // 유저 정보가 있을때 아이디, 비밀번호가 맞는지 검사
            for(int i = 0; i < memberList.Count; i++)
            {
                if (userInfo.ID == memberList[i].UserID)
                {
                    response.Message = "아이디가 일치함";
                    response.Success = true;
                }

                else
                {
                    response.Message = "아이디가 일치하지 않음";
                    response.Success = false;
                }

                if (userInfo.Password == memberList[i].PassWord)
                {
                    response.Message = "비밀번호가 일치함";
                    response.Success = true;
                }
                else
                {
                    response.Message = "비밀번호가 일치하지 않음";
                    response.Success = false;
                }
            }

            return Ok(response);
        }
    }
}
