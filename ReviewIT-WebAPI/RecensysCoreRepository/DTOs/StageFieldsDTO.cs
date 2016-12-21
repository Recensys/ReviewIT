using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class StageFieldsDTO
    {
        public ICollection<FieldDTO> AvailableFields { get; set; }
        public ICollection<FieldDTO> VisibleFields { get; set; }
        public ICollection<FieldDTO> RequestedFields { get; set; }
    }
}
