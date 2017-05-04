using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class UserWorkDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public double[] Range { get; set; }
    }
}
