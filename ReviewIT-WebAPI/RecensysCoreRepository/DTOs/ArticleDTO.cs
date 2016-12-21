using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class ArticleDTO
    {
        public int Id { get; set; }
        public Dictionary<string, string> Data { get; set; }
    }
}
