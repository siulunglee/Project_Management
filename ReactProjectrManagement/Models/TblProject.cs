using System;
using System.Collections.Generic;

namespace ProjectManagement.Models
{
    public partial class TblProject
    {
        public int ProjectId { get; set; }
        public string Project_Name { get; set; }
        public string Description { get; set; }
        public int CompanyID { get; set; }
        public string Project_Users_List_ID { get; set; }
        public string Template_ID { get; set; }
        public string Logos_ID { get; set; }
    }
}
