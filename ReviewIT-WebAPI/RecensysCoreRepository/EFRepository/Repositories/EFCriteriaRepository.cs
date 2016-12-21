using System;
using System.Collections.Generic;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class EFCriteriaRepository : ICriteriaRepository
    {
        private readonly RecensysContext _context;

        public EFCriteriaRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public CriteriaDTO Read(int studyId)
        {
            var inclusions = (from c in _context.Criterias
                where (c.StudyId == studyId) && (c.Type == CriteriaType.Inclusion)
                select new FieldCriteriaDTO
                {
                    Id = c.Id,
                    Value = c.Value,
                    Operator = c.Operator,
                    Field = new FieldDTO
                    {
                        Id = c.Field.Id,
                        Name = c.Field.Name,
                        DataType = c.Field.DataType
                    }
                }).ToList();

            var exclusions = (from c in _context.Criterias
                where (c.StudyId == studyId) && (c.Type == CriteriaType.Exclusion)
                select new FieldCriteriaDTO
                {
                    Id = c.Id,
                    Value = c.Value,
                    Operator = c.Operator,
                    Field = new FieldDTO
                    {
                        Id = c.Field.Id,
                        Name = c.Field.Name,
                        DataType = c.Field.DataType
                    }
                }).ToList();

            return new CriteriaDTO
            {
                Inclusions = inclusions,
                Exclusions = exclusions
            };
        }

        public bool Update(int studyId, CriteriaDTO dto)
        {
            var stored = (from c in _context.Criterias
                where c.StudyId == studyId
                select c).ToList();

            dto.Inclusions = dto.Inclusions ?? new List<FieldCriteriaDTO>();
            dto.Exclusions = dto.Exclusions ?? new List<FieldCriteriaDTO>();

            var concatList = dto.Inclusions.Concat(dto.Exclusions).ToList();
            foreach (var storedCriteria in stored)
            {
                if (concatList.All(cl => cl.Id != storedCriteria.Id))
                {
                    _context.Criterias.Remove(storedCriteria);
                }
                else
                {
                    var newCriteria = concatList.Single(c => c.Id == storedCriteria.Id);
                    storedCriteria.Operator = newCriteria.Operator;
                    storedCriteria.Value = newCriteria.Value;

                    // remove the updated one from the incoming dto
                    dto.Inclusions.Remove(newCriteria);
                    dto.Exclusions.Remove(newCriteria);
                }
            }
            _context.SaveChanges();

            foreach (var inclusion in dto.Inclusions) _context.Criterias.Add(Map(studyId, CriteriaType.Inclusion, inclusion));
            foreach (var exclusion in dto.Exclusions) _context.Criterias.Add(Map(studyId, CriteriaType.Exclusion, exclusion));

            return _context.SaveChanges() > 0;
            
        }

        private Criteria Map(int studyId, CriteriaType type, FieldCriteriaDTO dto)
        {
            return new Criteria
            {
                FieldId = dto.Field.Id,
                Operator = dto.Operator,
                StudyId = studyId,
                Value = dto.Value,
                Type = type
            };
        }
    }
}