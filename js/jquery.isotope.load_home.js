jQuery(window).load(function(){

  var defaultOptions = {
    filter: '.home',
    sortBy: 'original-order',
    sortAscending: true,
    layoutMode: 'masonry'
  };

  if ( $('.flexslider')[0] ) {
    jQuery('.flexslider').flexslider({
      animation: "slide",
      start: function(slider){
        var $container = $('#container');
        
        $container.isotope({
          itemSelector : '.element',
          masonry: { columnWidth: $container.width() / 12 },
          filter: defaultOptions.filter,
          sortBy: defaultOptions.sortBy,
          sortAscending: defaultOptions.sortAscending,
          layoutMode: defaultOptions.layoutMode
        });
    
        setupGlobalFilters($container);
      }
    });
  } else {
    var $container = $('#container');
    
    $container.isotope({
      itemSelector : '.element',
      masonry: { columnWidth: $container.width() / 12 },
      filter: defaultOptions.filter,
      sortBy: defaultOptions.sortBy,
      sortAscending: defaultOptions.sortAscending,
      layoutMode: defaultOptions.layoutMode
    });

    setupGlobalFilters($container);
  }

  function setupGlobalFilters($container) {
    var $optionSets = $('#options').find('.option-set');

    function changeSelectedLink( $elem ) {
      // 1. Remove selected from the clicked link's local menu group
      $elem.parents('.option-set').find('.selected').removeClass('selected');
      $elem.addClass('selected');

      // 2. Sync active classes globally: find ANY matching filter link on the page and light it up
      var currentHref = $elem.attr('href');
      $('a[href="' + currentHref + '"]').each(function() {
        $(this).parents('.option-set').find('.selected').removeClass('selected');
        $(this).addClass('selected');
      });
    }

    $(document).off('click', 'a[href*="filter="]').on('click', 'a[href*="filter="]', function(e){
      e.preventDefault(); 
      e.stopImmediatePropagation(); // Stops the BBQ plugin from hearing this click event!
      
      var $this = $(this);
      changeSelectedLink( $this );
      
      var href = $this.attr('href');
      var hashPart = href.substring(href.indexOf('#')); 
      
      var filterValue = decodeURIComponent(hashPart.replace('#filter=', '').replace(/\+/g, ' '));
      
      // Update Isotope directly
      $container.isotope({ filter: filterValue });

      // FORCE STRIP URL: Replaces the address bar layout instantly with zero hash traces
      if (history.replaceState) {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
      
      return false;
    });

    // Kill any lingering hash values if a user somehow loads the page with one
    if (window.location.hash.indexOf('filter=') !== -1 && history.replaceState) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }
    
});

jQuery(window).load(function(){
  setTimeout(function(){
    jQuery('#container').isotope('reLayout');
  }, 1000);
});
