using System;
using System.Collections.Generic;

namespace ProjectManagement.Models
{
    public partial class TblUser
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string Department { get; set; }
        public int CompanyID { get; set; }
        public string User_Name { get; set; }
        public string User_Password { get; set; }
        public string User_Email { get; set; }
        
    }
}
