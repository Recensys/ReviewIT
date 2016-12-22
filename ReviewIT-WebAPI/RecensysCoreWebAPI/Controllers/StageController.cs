using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliographyParserCore;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Repositories;
using RecensysCoreRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Route("api/")]
    public class StageController : Controller
    {

        private readonly IStageDetailsRepository _repo;
        private readonly IArticleRepository _articleRepo;
        private readonly IBibliographyParser _bibliographyParser;

        public StageController(IStageDetailsRepository repo, IArticleRepository articleRepo, IBibliographyParser bibliographyParser)
        {
            _repo = repo;
            _articleRepo = articleRepo;
            _bibliographyParser = bibliographyParser;
        }

        //// GET: api/values
        //[HttpGet]
        //public IActionResult GetAll(int stageId)
        //{
        //    try
        //    {
        //        using (_repo)
        //        {
        //            return Json(_repo.GetAll(stageId));
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500, e.Message);
        //    }
        //}

        // GET api/values/5
        [HttpGet("[controller]/{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                using (_repo)
                {
                    return Json(_repo.Read(id));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
                
        }

        // POST api/values
        [HttpPost("study/{studyId}/[controller]")]
        public IActionResult Post(int studyId, [FromBody]StageDetailsDTO dto)
        {
            try
            {
                using (_repo)
                {
                    return Json(_repo.Create(studyId, dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // PUT api/values/5
        [HttpPut("[controller]")]
        public IActionResult Put([FromBody]StageDetailsDTO dto)
        {
            try
            {
                using (_repo)
                {
                    return Json(_repo.Update(dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        

    }
}
