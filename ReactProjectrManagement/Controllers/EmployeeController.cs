using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
// https://developerlife.pl/en/upload-files-with-react-js-and-net-core-web-api/

namespace UserManager.Controllers
{
    public class UserController : Controller
    {
        UserDataAccessLayer objUser = new UserDataAccessLayer();

        [HttpGet]
        [Route("api/User/Index")]
        public IEnumerable<TblUser> Index()
        {
            return objUser.GetAllUsers();
        }

        [HttpPost]
        [Route("api/User/Create")]
        public int Create(TblUser user)
        {
            return objUser.AddUser(user);
        }

        [HttpGet]
        [Route("api/User/Details/{id}")]
        public TblUser Details(int id)
        {
            return objUser.GetUserData(id);
        }

        [HttpPut]
        [Route("api/User/Edit")]
        public int Edit(TblUser user)
        {
            return objUser.UpdateUser(user);
        }

        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        public int Delete(int id)
        {
            return objUser.DeleteUser(id);
        }

        [HttpGet]
        [Route("api/User/GetCityList")]
        public IEnumerable<TblCities> Details()
        {
            return objUser.GetCities();
        }
    }
}
