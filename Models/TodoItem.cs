using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace ASPCore2021Feb.Models {
    public class TodoItem {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public string Secret { get; set; }
        public DateTime dueDate { get; set; }
    }
}
