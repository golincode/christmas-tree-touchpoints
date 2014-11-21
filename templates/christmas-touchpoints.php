<?php
/**
 * Template Name: Christmas Touchpoints
 */
get_header(); ?>

	<div class="row">

		<div class="container">

			<?php if( have_posts() ): while( have_posts() ): the_post(); ?>

				<header id="post-<?php the_ID(); ?>" <?php post_class('christmas-touchpoints-header'); ?>>

					<h1><?php the_title(); ?></h1>

					<?php show_share_tools(); ?>

					<?php the_content(); ?>

				</header>

			<?php endwhile; endif; ?>

			<?php

			$filter_class = 'tp-filter__list';

			if( is_user_logged_in() ):
				$filter_class = 'tp-filter__list tp-filter__list--loggedin';
			endif;
			?>

			<div class="tp-filter">
				<h2 class="tp-filter__title">Filter by:</h2>

				<ul class="<?php echo $filter_class; ?>">
					<li class="tp-filter__item">
						<i class="tp-filter__icon tp-filter__icon--twitter"></i>
						<?php waa_toggle_switch('twitter'); ?>
						<span class="tp-filter__name">Twitter</span>
					</li>
					<li class="tp-filter__item">
						<i class="tp-filter__icon tp-filter__icon--facebook"></i>
						<?php waa_toggle_switch('facebook'); ?>
						<span class="tp-filter__name">Facebook</span>
					</li>
					<li class="tp-filter__item">
						<i class="tp-filter__icon tp-filter__icon--youtube"></i>
						<?php waa_toggle_switch('youtube'); ?>
						<span class="tp-filter__name">YouTube</span>
					</li>
					<li class="tp-filter__item">
						<i class="tp-filter__icon tp-filter__icon--news"></i>
						<?php waa_toggle_switch('news'); ?>
						<span class="tp-filter__name">News</span>
					</li>
					<li class="tp-filter__item">
						<i class="tp-filter__icon tp-filter__icon--yammer"></i>
						<?php waa_toggle_switch('yammer'); ?>
						<span class="tp-filter__name">Yammer</span>
					</li>
					<!-- Needs to only display when a user is logged in -->
					<?php if( is_user_logged_in() ): ?>
						<li class="tp-filter__item">
							<i class="tp-filter__icon tp-filter__icon--offer"></i>
							<?php waa_toggle_switch('offer'); ?>
							<span class="tp-filter__name tp-filter__name--offer">Colleague Offer</span>
						</li>
					<?php endif; ?>
				</ul>
			</div>

			<?php
			global $paged;
			$prev_pages = $paged - 1;
			$per_page = 2;
			$page_id = get_the_ID();

			$touchpoints = new WP_Query('post_type=waa_xmas_touchpoints&posts_per_page=' . $per_page . '&paged=' . $paged);

			$found = $touchpoints->found_posts;
			if( $paged > 0 ) {
				$count = $found - ($per_page * $prev_pages);
			} else {
				$count = $found;
			}
			?>

			<div id="xmas-tree" class="touchpoints-tree-container" data-days="<?php echo $count; ?>">
				<!-- Xmas tree goes here! -->
			</div>

			<div id="tree-fallback" class="touchpoints-articles-container" data-paged="<?php echo $paged; ?>" data-per-page="<?php echo $per_page; ?>" data-post-id="<?php echo $page_id; ?>">

				<?php if( $touchpoints->have_posts() ): while( $touchpoints->have_posts() ): $touchpoints->the_post(); ?>

					<article class="advent-day">

						<h2 class="advent-day__title" data-day-number="<?php echo $count; ?>"><?php echo $count; ?></h2>

						<div class="advent-day__container">

							<?php if( have_rows('waa_touchpoints') ): while( have_rows('waa_touchpoints') ): the_row(); ?>

								<?php if( 'offer' !== get_sub_field('waa_ctp_icon') || is_user_logged_in() ): ?>

									<section class="advent-day__item advent-day__item--<?php the_sub_field('waa_ctp_icon'); ?>">

										<?php if( get_sub_field('waa_ctp_image') ): ?>

											<img src="<?php the_sub_field('waa_ctp_image'); ?>" alt=" " class="advent-day__image">

										<?php endif; ?>

										<div class="advent-day__content">

											<h3><i class="advent-day__icon advent-day__icon--<?php the_sub_field('waa_ctp_icon'); ?>"></i><?php the_sub_field('waa_ctp_title'); ?></h3>
											<p><?php the_sub_field('waa_ctp_content'); ?></p>
											<p><a href="<?php the_sub_field('waa_ctp_link'); ?>">Read more &rsaquo;</a></p>
											<?php waa_share_tools($page_id); ?>
										</div>

									</section>

								<?php endif; ?>

							<?php endwhile; endif; ?>

						</div>

					</article>

				<?php
					$count--;

				endwhile; endif; ?>

			</div> <!-- /.touchpoint-articles-container -->

			<div class="touchpoint-articles-pagination">
				<?php waa_touchpoints_pagination($touchpoints); ?>
			</div>

		</div><!-- .container -->

	</div><!-- .row -->

<?php get_footer(); ?>
