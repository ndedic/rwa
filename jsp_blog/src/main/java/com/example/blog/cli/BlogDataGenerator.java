package com.example.blog.cli;

import com.example.blog.model.BlogEntry;
import com.example.blog.service.BlogService;
import com.example.blog.util.JPAUtil;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class BlogDataGenerator {
    
    private static final List<String> TITLES = Arrays.asList(
        "Understanding Microservices Architecture",
        "The Benefits of Test-Driven Development",
        "Introduction to Docker Containers",
        "Getting Started with Spring Boot",
        "JavaScript Promises Explained",
        "Best Practices for RESTful API Design",
        "Mastering Git Version Control",
        "The Power of Functional Programming",
        "Cloud Native Application Development",
        "Securing Web Applications: A Comprehensive Guide"
    );
    
    private static final List<String> CONTENT_TEMPLATES = Arrays.asList(
        "In this article, we explore %s in depth. This approach has gained significant popularity in recent years due to its flexibility and scalability. When implementing this technique, developers should focus on modular design and clear interfaces between components.",
        
        "%s is a fundamental concept that every developer should understand. It provides numerous benefits including improved code quality and maintainability. By adopting this methodology, teams can collaborate more effectively and deliver features faster.",
        
        "The world of software development is constantly evolving, and %s represents one of the most important advancements in recent years. This paradigm shift has changed how we think about building robust applications.",
        
        "Today we're diving into %s, a topic that has revolutionized how we approach software engineering problems. Understanding these principles will help you write cleaner, more efficient code and improve your overall development workflow.",
        
        "%s offers solutions to many common challenges faced by development teams. By implementing these practices, you can reduce technical debt and create more resilient systems that can adapt to changing requirements."
    );
    
    private static final Random random = new Random();
    
    public static void main(String[] args) {

        Runtime.getRuntime().addShutdownHook(new Thread(JPAUtil::shutdown));

        BlogService blogService = new BlogService();
        
        System.out.println("Starting to generate 10 random blog entries...");
        
        for (int i = 0; i < 10; i++) {
            String title = getRandomTitle();
            String content = generateContent(title);
            
            BlogEntry entry = new BlogEntry();
            entry.setTitle(title);
            entry.setContent(content);
            
            blogService.saveBlogEntry(entry);
            System.out.println("Created blog entry: " + title);
        }
        
        System.out.println("Successfully generated 10 blog entries!");
    }
    
    private static String getRandomTitle() {
        return TITLES.get(random.nextInt(TITLES.size()));
    }
    
    private static String generateContent(String title) {
        String template = CONTENT_TEMPLATES.get(random.nextInt(CONTENT_TEMPLATES.size()));
        String topic = title.toLowerCase().replace("understanding ", "").replace("introduction to ", "")
                           .replace("getting started with ", "").replace("the benefits of ", "")
                           .replace("mastering ", "").replace("the power of ", "");
        
        StringBuilder content = new StringBuilder();
        content.append(String.format(template, topic));
        content.append("\n\n");
        
        // Add some additional paragraphs
        content.append("## Key Benefits\n\n");
        content.append("1. Improved code organization and readability\n");
        content.append("2. Better scalability and performance\n");
        content.append("3. Enhanced security and reliability\n");
        content.append("4. Easier maintenance and updates\n\n");
        
        content.append("## Implementation Considerations\n\n");
        content.append("When implementing this approach, consider starting with a small proof of concept before scaling to your entire application. ");
        content.append("This allows you to validate the benefits and identify any potential challenges specific to your environment.\n\n");
        
        content.append("Remember that software development is as much about solving business problems as it is about writing code. ");
        content.append("Always keep the end user in mind when making architectural and design decisions.");
        
        return content.toString();
    }
}