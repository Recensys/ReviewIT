using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class CriteriaDTO
    {
        public ICollection<FieldCriteriaDTO> Inclusions { get; set; }
        public ICollection<FieldCriteriaDTO> Exclusions { get; set; }
    }
}
