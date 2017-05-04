using System;
using System.Collections.Generic;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;

namespace RecensysCoreRepository.Repositories
{
    public interface IArticleRepository: IDisposable
    {
        bool AddToStage(int stageId, int articleId);
        IEnumerable<int> GetAllIdsForStudy(int studyId);
        bool AddCriteriaResult(int criteriaId, int stageId, int articleId);
        IEnumerable<int> GetAllActiveIds(int studyId);
        IEnumerable<ArticleDTO> GetAllActive(int studyId);
        IEnumerable<ArticleWithRequestedFieldsDTO> GetAllWithRequestedFields(int stageId);
    }
}