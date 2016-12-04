<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
<body>
  <h3>For Sale</h3>
	
  <table border="1">
    <tr bgcolor="#5DADE2">
      <th style="text-align:left">For Sale</th>
      <th style="text-align:left">Price Wanted</th>
	 	 <th style="text-align:left">Product Condition</th>
	 	 <th style="text-align:left">Contact Seller</th>
    </tr>
		<xsl:for-each select="salesboard/ad[ItemForSale]">
    <tr>
      <td><xsl:value-of select="ItemForSale"/></td>
      <td><xsl:value-of select="Price"/></td>
	 		<td><xsl:value-of select="Description"/></td>
	  	<td><xsl:value-of select="Contact_details"/></td>
    </tr>
		</xsl:for-each>
  </table>
	
	<h3>To Buy</h3>
  <table border="1">
    <tr bgcolor="#2ECC71">
      <th style="text-align:left">Looking For Item</th>
      <th style="text-align:left">Willing To Pay</th>
	 	 <th style="text-align:left">Buyer comments</th>
	 	 <th style="text-align:left">Contact Buyer</th>
    </tr>
		<xsl:for-each select="salesboard/ad[ItemToBuy]">
    <tr>
      <td><xsl:value-of select="ItemToBuy"/></td>
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
