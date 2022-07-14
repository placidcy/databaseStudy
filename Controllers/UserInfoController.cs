using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


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
            if(userInfo != null)
            {
                m_dbManager.RequestSQL("SELECT userID, password FROM UserInfo");

                return Ok();
            }

            return BadRequest();
        }
    }
}
