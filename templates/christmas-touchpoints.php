<?php
/**
 * Template Name: Christmas Touchpoints
 */
get_header(); ?>

	<div class="row">

		<div class="container">

			<?php if( have_posts() ): while( have_posts() ): the_post(); ?>

				<header id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

					<h1><?php the_title(); ?></h1>

					<?php show_share_tools(); ?>

					<?php the_content(); ?>

				</header>

			<?php endwhile; endif; ?>

			<?php
			$touchpoints = new WP_Query('post_type=waa_xmas_touchpoints');
			$count = $touchpoints->found_posts;
			?>
			<div class="touchpoints-tree-container" data-days="<?php echo $count; ?>"></div>

			<div class="touchpoints-articles-container">

				<?php if( $touchpoints->have_posts() ): while( $touchpoints->have_posts() ): $touchpoints->the_post(); ?>

					<article class="advent-day">

						<h2 class="advent-day__title" data-day-number="<?php echo $count; ?>"><?php echo $count; ?></h2>

						<?php if( have_rows('waa_touchpoints') ): while( have_rows('waa_touchpoints') ): the_row(); ?>

							<section class="advent-day__item" data-type="<?php the_sub_field('waa_ctp_icon'); ?>">

								<?php if( get_sub_field('waa_ctp_image') ): ?>

									<img src="<?php the_sub_field('waa_ctp_image'); ?>" alt=" " class="advent-day__image">

								<?php endif; ?>

								<div class="advent-day__content">

									<h3><i class="advent-day__icon advent-day--<?php the_sub_field('waa_ctp_icon'); ?>"></i><?php the_sub_field('waa_ctp_title'); ?></h3>
									<p><?php the_sub_field('waa_ctp_content'); ?></p>
									<p><a href="<?php the_sub_field('waa_ctp_link'); ?>">Read more &raquo;</a></p>

								</div>

							</section>

						<?php endwhile; endif; ?>

					</article>

				<?php
					$count--;

				endwhile; endif; ?>

			</div> <!-- /.touchpoint-articles-container -->

		</div><!-- .container -->

	</div><!-- .row -->

<?php get_footer(); ?>
