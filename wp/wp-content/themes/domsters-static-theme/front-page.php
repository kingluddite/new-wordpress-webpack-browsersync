<?php get_header(); ?>

   <div id="content">

     <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <?php the_content(); ?>

        <?php endwhile; endif; ?>

         <div>
             <?php if ( dynamic_sidebar( 'front-left' ) ); ?>
         </div>

         <div>
           <?php if ( dynamic_sidebar( 'front-center' ) ); ?>
        </div>

         <div>
           <?php if ( dynamic_sidebar( 'front-right' ) ); ?>
         </div>

   </div>
   <!-- END #content -->
<?php get_footer(); ?>
