using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class ArticleWithRequestedFieldsDTO
    {
        public int[] FieldIds { get; set; }
        public int ArticleId { get; set; }
    }
}
