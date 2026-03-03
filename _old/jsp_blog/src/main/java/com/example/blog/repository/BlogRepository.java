package com.example.blog.repository;

import com.example.blog.model.BlogEntry;
import com.example.blog.util.JPAUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

public class BlogRepository {
    
    public List<BlogEntry> findAll() {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            TypedQuery<BlogEntry> query = em.createQuery("SELECT b FROM BlogEntry b ORDER BY b.createdAt DESC", BlogEntry.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
    
    public Optional<BlogEntry> findById(Long id) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            BlogEntry entry = em.find(BlogEntry.class, id);
            return Optional.ofNullable(entry);
        } finally {
            em.close();
        }
    }
    
    public void save(BlogEntry blogEntry) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            if (blogEntry.getId() == null) {
                em.persist(blogEntry);
            } else {
                em.merge(blogEntry);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw e;
        } finally {
            em.close();
        }
    }
    
    public void delete(Long id) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            BlogEntry entry = em.find(BlogEntry.class, id);
            if (entry != null) {
                em.remove(entry);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw e;
        } finally {
            em.close();
        }
    }
}