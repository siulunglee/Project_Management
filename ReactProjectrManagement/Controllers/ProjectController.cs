using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectManagement.Models;

namespace ProjectManagement.Controllers
{
    public class ProjectController : Controller
    {
        ProjectDataAccessLayer objProject = new ProjectDataAccessLayer();

        [HttpGet]
        [Route("api/Project/Index")]
        public IEnumerable<TblProject> Index()
        {
            return objProject.GetAllProjects();
        }

        [HttpPost]
        [Route("api/Project/Create")]
        public int Create(TblProject project)
        {
            return objProject.AddProject(project);
        }

        [HttpGet]
        [Route("api/Project/Details/{id}")]
        public TblProject Details(int id)
        {
            return objProject.GetProjectData(id);
        }

        [HttpPut]
        [Route("api/Project/Edit")]
        public int Edit(TblProject project)
        {
            return objProject.UpdateProject(project);
        }

        [HttpDelete]
        [Route("api/Project/Delete/{id}")]
        public int Delete(int id)
        {
            return objProject.DeleteProject(id);
        }

        //[HttpGet]
        //[Route("api/Project/GetUList")]
        //public IEnumerable<TblCities> Details()
        //{
        //    return objProject.GetCities();
        //}
    }
}
