<?php get_header(); ?>
   <div id="content">
     <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
               <!-- tbs class for headers -->
                 <h1><?php the_title(); ?></h1>
               <!-- WP function that outputs post content -->
               <?php the_content(); ?>

             <?php endwhile; else: ?>
                <!-- we run this else if there is no content -->
                 <h1>Wups!</h1>

               <p>Looks like we have no content for this page?</p>

             <?php endif; ?>
             <?php get_sidebar(); ?>
   </div>
<?php get_footer(); ?>
