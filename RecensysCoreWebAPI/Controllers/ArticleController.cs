using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Authorize]
    [Route("api/study/{studyId}")]
    public class ArticleController : Controller
    {

        private readonly IArticleRepository _articleRepo;
        private readonly IStudyDetailsRepository _studyRepo;

        public ArticleController(IArticleRepository articleRepo, IStudyDetailsRepository studyRepo)
        {
            _articleRepo = articleRepo;
            _studyRepo = studyRepo;
        }

        // GET: api/values
        [HttpGet("articles")]
        public IActionResult Get(int studyId)
        {
            if (!ModelState.IsValid) return BadRequest();

            using (_articleRepo)
            using (_studyRepo)
            {
                var stageId = _studyRepo.GetStageIds(studyId).FirstOrDefault();
                if (stageId == default(int)) return NoContent(); 
                return Ok(_articleRepo.GetAllActive(stageId));
            }

        }
        
    }
}
