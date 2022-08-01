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
        public ActionResult requestLogin([FromBody] User userInfo)
        {
            List<UserInfo> memberList = new List<UserInfo>();
            ResponseUser user = new ResponseUser();

            // 해당하는 아이디가 있는지 검사
            memberList = m_dbManager.SelectUserInfos("ID= '" + userInfo.ID + "'");

            // memberList값이 없을때(SQL 쿼리문이 잘못됐을때)
            if(memberList == null)
            {
                user.Success = false;
                user.Message = "유저 목록 컨테이너가 할당되지 않음";
            }

            // 유저 정보가 없을때(memberLIst.count == 0)
            if (memberList.Count == 0)
            {
                user.Success = false;
                user.Message = "저장된 유저 정보가 없음";
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
                    user.UserInfo.PassWord = memberList[0].PassWord;
                }

                else
                {
                    user.Message = "비밀번호가 일치하지 않음";
                    user.Success = false;
                }
            }

            return Ok(user);
        }

        [HttpPost]
        public ActionResult requestUserDatas()
        {
            List<UserInfo> memberList = new List<UserInfo>();
            memberList = m_dbManager.SelectUserInfos("");

            ResponseUser[] resUsers = new ResponseUser[memberList.Count];

            for(int i = 0; i < memberList.Count; i++)
            {
                resUsers[i] = new ResponseUser();
                resUsers[i].UserInfo = new UserInfo();

                if (memberList == null)
                {
                    resUsers[i].Message = "유저 목록 컨테이너가 할당되지 않음";
                    resUsers[i].Success = false;
                }

                if (memberList.Count == 0)
                {
                    resUsers[i].Message = "저장된 유저 정보가 없음";
                    resUsers[i].Success = false;
                }

                else
                {
                    resUsers[i].Message = "유저 찾기 성공";
                    resUsers[i].Success = true;
                    resUsers[i].UserInfo.ID = memberList[i].ID;
                    resUsers[i].UserInfo.Name = memberList[i].Name;
                    resUsers[i].UserInfo.Email = memberList[i].Email;
                }
                
            }

            return Ok(resUsers);
        }

        [HttpPost]
        public ActionResult ModifyUserInformation([FromBody] ModifiedUserInfo modifiedInfo)
        {
            List<UserInfo> memberList = new List<UserInfo>();

            memberList = m_dbManager.ModifyUserDB(modifiedInfo.UserName, modifiedInfo.UserEmail, modifiedInfo.ID.ToString());

            ResponseUser[] resUsers = new ResponseUser[memberList.Count];

            for (int i = 0; i < memberList.Count; i++)
            {
                resUsers[i] = new ResponseUser();
                resUsers[i].UserInfo = new UserInfo();

                if (memberList == null)
                {
                    resUsers[i].Message = "유저 목록 컨테이너가 할당되지 않음";
                    resUsers[i].Success = false;
                }

                if (memberList.Count == 0)
                {
                    resUsers[i].Message = "저장된 유저 정보가 없음";
                    resUsers[i].Success = false;
                }

                else
                {
                    resUsers[i].Message = "유저 찾기 성공";
                    resUsers[i].Success = true;

                    resUsers[i].UserInfo.Name = memberList[i].Name;
                    //resUsers[i].UserInfo.PassWord = memberList[i].UserPassWord;
                    resUsers[i].UserInfo.Email = memberList[i].Email;
                }

            }

            return Ok(resUsers);
        }

        [HttpPost]
        public ActionResult ModifyPassWord([FromBody] UserPassWord password)
        {
            List<UserInfo> memberList = new List<UserInfo>();

            memberList = m_dbManager.ModifyPassWord_DB(password.Password, password.ID.ToString());

            ResponseUser[] resUsers = new ResponseUser[memberList.Count];

            for (int i = 0; i < memberList.Count; i++)
            {
                resUsers[i] = new ResponseUser();
                resUsers[i].UserInfo = new UserInfo();

                if (memberList == null)
                {
                    resUsers[i].Message = "유저 목록 컨테이너가 할당되지 않음";
                    resUsers[i].Success = false;
                }

                if (memberList.Count == 0)
                {
                    resUsers[i].Message = "저장된 유저 정보가 없음";
                    resUsers[i].Success = false;
                }

                else
                {
                    resUsers[i].Message = "유저 찾기 성공";
                    resUsers[i].Success = true;

                    resUsers[i].UserInfo.PassWord = memberList[i].PassWord;
                }
            }

            return Ok(resUsers);
        }

        [HttpPost]
        public ActionResult JoinUser([FromBody] UserInfo userInfo)
        {
            List<UserInfo> memberList = new List<UserInfo>();
            List<UserInfo> checkMemberList = new List<UserInfo>();

            memberList = m_dbManager.AddUserInfo(userInfo.UserID, userInfo.Name, userInfo.Email, userInfo.PhoneNumber, userInfo.PassWord, userInfo.UserID);

            ResponseUser resUser = new ResponseUser();
            resUser.UserInfo = new UserInfo();

            if(memberList == null)
            {
                resUser.Message = "유저 목록 컨테이너가 할당되지 않음";
                resUser.Success = false;
            }

            if(memberList.Count == 0)
            {
                resUser.Message = "저장된 유저 정보가 없음";
                resUser.Success = false;
            }

            else
            {
                resUser.Message = "유저 찾기 성공";
                resUser.Success = true;

                resUser.UserInfo.UserID = userInfo.UserID;
                resUser.UserInfo.Name = userInfo.Name;
                resUser.UserInfo.Email = userInfo.Email;
                resUser.UserInfo.PhoneNumber = userInfo.PhoneNumber;
            }

            return Ok(resUser);
        }
    }
}
