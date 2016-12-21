using System;
using System.Collections.Generic;

namespace RecensysCoreRepository.DTOs
{
    public class StageConfigDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<FieldDTO> VisibleFields { get; set; }
        public ICollection<FieldDTO> RequestedFields { get; set; }

    }
}
