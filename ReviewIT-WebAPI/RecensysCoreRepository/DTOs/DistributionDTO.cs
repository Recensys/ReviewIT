using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class DistributionDTO
    {
        public int StageId { get; set; }
        public bool? IsRandomized { get; set; }
        public Dictionary<UserDetailsDTO, double> Distribution { get; set; }
        public List<UserWorkDTO> Dist { get; set; }
    }
}
