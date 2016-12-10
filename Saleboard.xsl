<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">	
	<html>
	<header>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
	</script>
						<script type="text/javascript" src="/js/jquery.sortElements.js">
	</script>
			<script>
				
		$(document).ready(function() {
		var table = $('table');
    
    $('#refnum')
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            th.click(function(){
                
                table.find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                    
                    return $.text([a]) > $.text([b]) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                
                inverse = !inverse;
                    
            });
                
        });
				});
			 </script>

	</header>
	<body>
	<h3>To Buy</h3>
  <table border="1">
    <tr bgcolor="#364156">
			<th style="text-align:left" id="refnum">Reference Number</th>
      <th style="text-align:left">Wanted</th>
      <th style="text-align:left">Willing To Pay</th>
	 	 <th style="text-align:left">Buyer comments</th>
	 	 <th style="text-align:left">Buyers Email</th>
    </tr>
		<xsl:for-each select="salesboard/ad[ItemToBuy]">
    <tr>
			<td><xsl:number/>. <xsl:value-of select="RefID"/></td>
      <td><xsl:value-of select="ItemToBuy"/></td>
      <td><xsl:value-of select="Price"/></td>
	 		<td><xsl:value-of select="Description"/></td>
	  	<td><xsl:value-of select="Contact_details"/></td>
    </tr>
		</xsl:for-each>
	</table>	
	
  <h3>For Sale</h3>
  <table border="1">
    <tr bgcolor="#7D4E57">
			<th style="text-align:left">Reference Number</th>
      <th style="text-align:left">For Sale</th>
      <th style="text-align:left">Price Wanted</th>
	 	 <th style="text-align:left">Product Condition</th>
	 	 <th style="text-align:left">Sellers Email</th>
    </tr>
		<xsl:for-each select="salesboard/ad[ItemForSale]">
    <tr>
			<td><xsl:number/>. <xsl:value-of select="RefID"/></td>
      <td><xsl:value-of select="ItemForSale"/></td>
      <td><xsl:value-of select="Price"/></td>
	 		<td><xsl:value-of select="Description"/></td>
	  	<td><xsl:value-of select="Contact_details"/></td>
    </tr>
		</xsl:for-each>
  </table>
	</body>
	</html>
	
	

</xsl:template>
</xsl:stylesheet>
