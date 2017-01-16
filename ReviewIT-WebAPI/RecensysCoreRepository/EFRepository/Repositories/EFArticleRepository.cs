using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class EFArticleRepository: IArticleRepository
    {
        private readonly RecensysContext _context;

        public EFArticleRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }
        
        public bool AddToStage(int stageId, int articleId)
        {
            _context.CriteriaResults.Add(new CriteriaResult
            {
                StageId = stageId,
                ArticleId = articleId
            });

            return _context.SaveChanges() > 0;
        }

        public IEnumerable<int> GetAllIdsForStudy(int studyId)
        {
            return from a in _context.Articles
                where a.StudyId == studyId
                select a.Id;
        }

        public bool AddCriteriaResult(int criteriaId, int stageId, int articleId)
        {
            var article = _context.Articles.Single(a => a.Id == articleId);
            article.CriteriaResult = new CriteriaResult
            {
                CriteriaId = criteriaId,
                StageId = stageId,
            };
            return _context.SaveChanges() > 0;
        }

        /// <summary>
        ///     An active article is defined by an article that's not excluded - thus either included or not affected by a criteria
        /// </summary>
        /// <param name="studyIdStage"></param>
        /// <returns></returns>
        public IEnumerable<int> GetAllActiveIds(int studyId)
        {
            //For some reason, this does not return the article if it's not affected by a criteria, so it has to be done with two calls to the db
            //return (from a in _context.Articles
            //        where a.StudyId == studyId && (!a.CriteriaResultId2.HasValue || a.CriteriaResult.Criteria.Type != CriteriaType.Exclusion)
            //        select a.Id).ToArray();


            //var unAffectedArticles = (from a in _context.Articles
            //                          where a.StudyId == studyId && a.CriteriaResult == null
            //                          select a.Id).ToArray();

            //var includedArticles = (from a in _context.Articles
            //                        where a.StudyId == studyId && a.CriteriaResultId2.HasValue && a.CriteriaResult.Criteria.Type != CriteriaType.Exclusion
            //                        select a.Id).ToArray();

            //var allArticleIds = unAffectedArticles.Concat(includedArticles);

            string query = $@"SELECT temp.Id, temp.StudyId
                        FROM 
	                        (SELECT dbo.Articles.Id, dbo.Articles.StudyId, dbo.Criterias.Type
	                        FROM dbo.Articles
	                        FULL OUTER JOIN dbo.CriteriaResults ON dbo.Articles.Id = dbo.CriteriaResults.ArticleId
	                        FULL OUTER JOIN dbo.Criterias ON dbo.Criterias.Id = dbo.CriteriaResults.CriteriaId
	                        WHERE dbo.Articles.StudyId = {studyId}) AS temp
                        WHERE temp.Type IS NULL OR temp.Type != 1";

            return _context.Articles.FromSql(query).Select(a => a.Id);
        }

        public IEnumerable<ArticleDTO> GetAllActive(int studyId)
        {
            var articleIds = GetAllActiveIds(studyId).ToArray();

            return from i in _context.Articles
                   where articleIds.Any(aid => aid == i.Id)
                   select new ArticleDTO()
                   {
                       Id = i.Id,
                       Data = (from d in i.Data
                                select new { d.Field.Name, d.Value }).ToDictionary(r => r.Name, r => r.Value)
                   };
        }

        public IEnumerable<ArticleWithRequestedFieldsDTO> GetAllWithRequestedFields(int stageId)
        {
            var articleIds = GetAllActiveIds(stageId).ToArray();

            return from i in _context.Articles
                where articleIds.Any(aid => aid == i.Id)
                select new ArticleWithRequestedFieldsDTO
                {
                    ArticleId = i.Id,
                    FieldIds = (from sf in _context.StageFieldRelations
                                where sf.StageId == stageId && sf.FieldType == FieldType.Requested
                                select sf.FieldId).ToArray()
                };
        }

        /// <summary>
        ///     
        /// </summary>
        /// <param name="current"></param>
        /// <param name="prevStage"></param>
        /// <returns>true if got prev stagId, false if there is no prev studyId</returns>
        private bool TryGetPreviousStage(int current, out int prevStage)
        {
            var studyId = (from s in _context.Stages
                           where s.Id == current
                           select s.StudyId).Single();

            var stageIds = (from s in _context.Stages
                             where s.StudyId == studyId
                             orderby s.Id
                             select s.Id).ToArray();

            var index = Array.IndexOf(stageIds, current);
            if (index == 0)
            {
                prevStage = -1;
                return false;
            }
            else
            {
                prevStage = stageIds[index - 1];
                return true;
            }
        }
    }
}