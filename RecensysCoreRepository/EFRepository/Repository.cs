using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RecensysCoreRepository.EFRepository.Entities;

namespace RecensysCoreRepository.EFRepository
{
    public class Repository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly RecensysContext _context;

        internal Repository(RecensysContext context)
        {
            _context = context;
            if(_context.Set<T>() == null)
                throw new InvalidOperationException($"The context does not have a set of type {typeof(T)}");
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public int Create(T item)
        {
            _context.Set<T>().Add(item);
            _context.SaveChanges();
            return item.Id;
        }

        public T Read(int id)
        {
            return _context.Set<T>().Single(t => t.Id == id);
        }

        public void Update(T item)
        {
            _context.Set<T>().Attach(item);
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();

            //_context.Set<T>().Update(item);
            //_context.SaveChanges();
        }

        public void Delete(int id)
        {
            Delete(Read(id));
        }

        public void Delete(T item)
        {
            _context.Set<T>().Remove(item);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
