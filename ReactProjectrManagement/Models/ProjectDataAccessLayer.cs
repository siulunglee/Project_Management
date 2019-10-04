using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagement.Models
{
    public class ProjectDataAccessLayer
    {
        ProjectManDBContext db = new ProjectManDBContext();

        public IEnumerable<TblUser> GetAllUsers()
        {
            try
            {
                return db.TblUser.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new user record   
        public int AddUser(TblUser user)
        {
            try
            {
                db.TblUser.Add(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar user  
        public int UpdateUser(TblUser user)
        {
            try
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular user  
        public TblUser GetUserData(int id)
        {
            try
            {
                TblUser user = db.TblUser.Find(id);
                return user;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular user  
        public int DeleteUser(int id)
        {
            try
            {
                TblUser emp = db.TblUser.Find(id);
                db.TblUser.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Get the list of Cities  
        public List<TblCities> GetCities()
        {
            List<TblCities> lstCity = new List<TblCities>();
            lstCity = (from CityList in db.TblCities select CityList).ToList();

            return lstCity;
        }




        public IEnumerable<TblProject> GetAllProjects()
        {
            try
            {
                return db.TblProject.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new project record   
        public int AddProject(TblProject project)
        {
            try
            {
                db.TblProject.Add(project);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar project  
        public int UpdateProject(TblProject project)
        {
            try
            {
                db.Entry(project).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular project  
        public TblProject GetProjectData(int id)
        {
            try
            {
                TblProject project = db.TblProject.Find(id);
                return project;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular project  
        public int DeleteProject(int id)
        {
            try
            {
                TblProject proj = db.TblProject.Find(id);
                db.TblProject.Remove(proj);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Get the list of Company  
        //    public List<TblCities> GetCompany()
        //    {
        //        List<TblCities> lstCity = new List<TblCities>();
        //        lstCity = (from CityList in db.TblCities select CityList).ToList();

        //        return lstCity;
        //    }
        //}

    }



}
