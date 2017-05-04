using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;
using FieldType = RecensysCoreRepository.DTOs.FieldType;
using Task = System.Threading.Tasks.Task;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class StageFieldsRepository : IStageFieldsRepository
    {

        private readonly RecensysContext _context;

        public StageFieldsRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }
        
        public StageFieldsDTO Get(int stageId)
        {
            var dto = new StageFieldsDTO();

            dto.VisibleFields = (from sf in _context.StageFieldRelations
                where sf.StageId == stageId && sf.FieldType == FieldType.Visible
                select new FieldDTO() {Id = sf.FieldId, Name = sf.Field.Name, DataType = sf.Field.DataType}).ToList();

            dto.RequestedFields = (from sf in _context.StageFieldRelations
                                 where sf.StageId == stageId && sf.FieldType == FieldType.Requested
                                 select new FieldDTO() { Id = sf.FieldId, Name = sf.Field.Name, DataType = sf.Field.DataType }).ToList();
            
            // available fields must be all fields exclusing the ones gathered above
            dto.AvailableFields = (from f in _context.Fields
                where f.Study.Stages.Any(st => st.Id == stageId) && dto.VisibleFields.All(vf => vf.Id != f.Id) && dto.RequestedFields.All(rf => rf.Id != f.Id)
                select new FieldDTO {Id = f.Id, Name = f.Name, DataType = f.DataType}).ToList();

            return dto;
        }

        public List<FieldDTO> Get(int stageId, FieldType fieldType)
        {
            return (from sf in _context.StageFieldRelations
             where sf.StageId == stageId && sf.FieldType == fieldType
             select new FieldDTO() { Id = sf.FieldId, Name = sf.Field.Name, DataType = sf.Field.DataType }).ToList();
        }

        public async Task<StageFieldsDTO> GetAsync(int stageId)
        {
            throw new NotImplementedException();

            var requested = (from sf in _context.StageFieldRelations
                    where sf.StageId == stageId && sf.FieldType == FieldType.Requested
                    select
                    new FieldDTO() {Id = sf.FieldId, Name = sf.Field.Name, DataType = (DataType) sf.Field.DataType})
                .ToListAsync();

            var visible = (from sf in _context.StageFieldRelations
                    where sf.StageId == stageId && sf.FieldType == FieldType.Visible
                    select
                    new FieldDTO() {Id = sf.FieldId, Name = sf.Field.Name, DataType = (DataType) sf.Field.DataType})
                .ToListAsync();

            await Task.WhenAll(requested, visible);

            return new StageFieldsDTO()
            {
                RequestedFields = requested.Result,
                VisibleFields = visible.Result
            };
        }

        public bool Update(int stageId, StageFieldsDTO dto)
        {
            var stored = from sf in _context.StageFieldRelations
                where sf.StageId == stageId
                select sf;

            _context.StageFieldRelations.RemoveRange(stored);
            _context.SaveChanges();
            
            if (dto.VisibleFields != null) _context.StageFieldRelations.AddRange(dto.VisibleFields.MapDTO(FieldType.Visible, stageId));
            if (dto.RequestedFields != null) _context.StageFieldRelations.AddRange(dto.RequestedFields.MapDTO(FieldType.Requested, stageId));
            
            return _context.SaveChanges() > 0;
        }

        public async Task<bool> UpdateAsync(int stageId, StageFieldsDTO dto)
        {
            throw new NotImplementedException();
            var stored = from sf in _context.StageFieldRelations
                         where sf.StageId == stageId
                         select sf;

            _context.StageFieldRelations.RemoveRange(stored);
            await _context.SaveChangesAsync();

            foreach (var field in dto.VisibleFields)
            {
                var entity = new StageFieldRelation()
                {
                    StageId = stageId,
                    FieldId = field.Id,
                    FieldType = FieldType.Visible
                };
                _context.StageFieldRelations.Add(entity);
            }

            foreach (var field in dto.RequestedFields)
            {
                var entity = new StageFieldRelation()
                {
                    StageId = stageId,
                    FieldId = field.Id,
                    FieldType = FieldType.Requested
                };
                _context.StageFieldRelations.Add(entity);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        
    }

    public static class Extensions
    {
        public static ICollection<StageFieldRelation> MapDTO(this ICollection<FieldDTO> dtos, FieldType ftype, int stageId)
        {
            var r = new List<StageFieldRelation>();
            foreach (var dto in dtos)
            {
                r.Add(new StageFieldRelation()
                {
                    FieldType = ftype,
                    FieldId = dto.Id,
                    StageId = stageId
                });
            }
            return r;
        }
    }
}
