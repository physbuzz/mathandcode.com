
//Solves Laplace's equation \nabla^2 \varphi=0 as a boundary value problem in cylindrical coordinates
//n2 is the length of the z axis of the solution
//n1 is the length of the rho (radial) axis of the solution
//f should be a list of boundary values, in the form [[i1,i2,i3,...],[j1,j2,j3,...],[v1,v2,v3,...]]

var getSoln=function(n1,n2,fIndices){

	cylgrid = function(n) {
		if(typeof n === "number") n = [n,n];
		var ret = numeric.rep(n,-1);
		var i,j,count;
		count=0;
		for(i=0;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
		{
			if(i==1 && j==1)
				count=0;
			ret[i][j] = count;
			count++;
		}
		return ret;
	}
	var G = cylgrid([n1+2,n2+2]);
	var n=numeric.norminf(G)+1;
	var f1=numeric.rep([n],0);
	var f2=numeric.rep([n],0);

	for(var i=0;i<fIndices[0].length;i++){
		f1[G[fIndices[0][i]+1][fIndices[1][i]+1]]=fIndices[2][i];
		f2[G[fIndices[0][i]+1][fIndices[1][i]+1]]=1;
		
	}

	cyldelsq = function(g,f1,f2) {
		var dir = [[-1,0],[0,-1],[0,1],[1,0]];
		var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
		var Li = [], Lj = [], Lv = [];
		for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
			if(g[i][j]<0) continue;

			if(f2[g[i][j]]===0){
				var val = [1.0-1.0/(2*i-1),1,1,1.0+1.0/(2*i-1)]
				for(k=0;k<4;k++) {
					p = i+dir[k][0];
					q = j+dir[k][1];
					if(g[p][q]<0) continue;
					Li.push(g[i][j]);
					Lj.push(g[p][q]);
					Lv.push(val[k]);
				}
				Li.push(g[i][j]);
				Lj.push(g[i][j]);
				Lv.push(-4);
			} else if(f2[g[i][j]]===1){
				Li.push(g[i][j]);
				Lj.push(g[i][j]);
				Lv.push(1);
			}
		}
		return [Li,Lj,Lv];
	}
	//document.getElementById("bench").innerHTML=numeric.prettyPrint(cyldelsq(cylgrid(9)));
	var L=cyldelsq(G,f1,f2);


	var u=numeric.cLUsolve(numeric.cLU(L),f1);
	var U=numeric.rep([n1,n2],0);
	for(i=1;i<=n1;i++) for(j=1;j<=n2;j++) if(G[i][j]>=0) U[i-1][j-1] = u[G[i][j]];
	return U;

};

